USE [rs_users]
GO
/****** Object:  StoredProcedure [dbo].[rsu_password_forgot]    Script Date: 1/24/2017 5:32:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[rsu_password_forgot]
(
	@email nvarchar(255),
	@session_id bigint = null
)
AS
BEGIN TRY
	DECLARE @user_uuid uniqueidentifier
	DECLARE @comm_id bigint
	DECLARE @verify_code nvarchar(255)
	DECLARE @comm_data nvarchar(3000)
	DECLARE @is_verified bit
	DECLARE @address nvarchar(200)
	DECLARE @verify_type varchar(20)
	DECLARE @medium varchar(20) = 'email'

	select @comm_id=id, @user_uuid=user_uuid, @is_verified=is_verified, @address=[address], @verify_type=medium from rsu_comms where address=@email and medium=@medium

	IF (@user_uuid is null)
		RAISERROR('comm.noexist', 16,67)

	SET @verify_code=NEWID()
	
	SET @comm_data = (SELECT @address [address], @medium as medium, user_uuid,first_name,last_name,username, @verify_code verify_code from rsu_users where user_uuid=@user_uuid FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
	
	INSERT INTO rsu_verifications (comm_id, user_uuid,verify_code,verify_type,comm_data, date_expiry)
		VALUES (@comm_id,@user_uuid,@verify_code,'forgot',@comm_data, DATEADD(d, 10,SYSDATETIME()) )

	SELECT @user_uuid as user_uuid, @verify_code as verify_code, @comm_data as data

END TRY
BEGIN CATCH
	DECLARE @err_json nvarchar(2000)
	SET @err_json = (SELECT
		ERROR_MESSAGE() AS [message],
		ERROR_LINE() AS line,
		ERROR_NUMBER() AS number,
		ERROR_SEVERITY() AS severity,
		ERROR_STATE() AS [state],
		ERROR_PROCEDURE() AS [procedure]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
	SELECT @err_json as error
END CATCH

GO
rsu_password_forgot 'santosh@rumsan.com'

