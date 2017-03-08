USE [rs_users]
GO
/****** Object:  StoredProcedure [dbo].[rsu_get]    Script Date: 1/24/2017 4:51:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[rsu_get]
(
	@user_uuid uniqueidentifier,
	@session_id bigint = null
)
AS
BEGIN TRY

	select *,
	(SELECT * FROM [dbo].[rsu_comms] where user_uuid=@user_uuid FOR JSON PATH) as comms
	from rsu_users where user_uuid=@user_uuid

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
rsu_get '15DC6232-2FA7-4A1D-9A7D-101E319A6761'

