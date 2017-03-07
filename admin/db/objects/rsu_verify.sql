USE [rs_users]
GO
/****** Object:  StoredProcedure [dbo].[rs_user_verify]    Script Date: 12/29/2016 10:21:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[rsu_verify]
(
	@verify_code nvarchar(40),
	@ip_address nvarchar(100)
)
AS
BEGIN TRY
	BEGIN TRAN
	DECLARE @id bigint
	DECLARE @uuid uniqueidentifier
	DECLARE @verify_type varchar(20)

	SELECT @uuid=user_uuid,@verify_type=verify_type
		FROM rsu_t_verifications where verify_code=@verify_code
	
	IF(@uuid is null)
		RAISERROR('Invalid verification code', 16,1)

	UPDATE rsu_t_verifications SET date_verified=GetDate(),ip_address=@ip_address, verify_type=@verify_type WHERE user_uuid=@uuid
	UPDATE rsu_t_comms SET is_verified=1,date_verified=GetDate() WHERE user_uuid=@uuid 


	SELECT @uuid AS uuid, @verify_type AS verify_type

	COMMIT TRAN
END TRY
BEGIN CATCH
   IF @@TRANCOUNT > 0
   BEGIN
       ROLLBACK 
       
		SELECT
			ERROR_NUMBER() AS ErrorNumber,
			ERROR_SEVERITY() AS ErrorSeverity,
			ERROR_STATE() AS ErrorState,
			ERROR_PROCEDURE() AS ErrorProcedure,
			ERROR_LINE() AS ErrorLine,
			ERROR_MESSAGE() AS ErrorMessage;
   END
END CATCH
