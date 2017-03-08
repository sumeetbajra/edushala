USE [rs_users]
GO
/****** Object:  StoredProcedure [dbo].[rsu_getby_username]    Script Date: 1/25/2017 4:34:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE rsu_getby_username
(
	@username varchar
)
AS
BEGIN TRY
	BEGIN TRAN
	select *,
	(SELECT * FROM [dbo].[rsu_comms] where username=@username FOR JSON PATH) as comms
	from rsu_users where username=@username
	COMMIT TRAN
END TRY
BEGIN CATCH
   IF @@TRANCOUNT > 0
   BEGIN
       ROLLBACK 
       
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
   END
END CATCH

