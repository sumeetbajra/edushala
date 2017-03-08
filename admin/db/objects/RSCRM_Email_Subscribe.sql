USE [ezzo_dev]
GO
/****** Object:  StoredProcedure [dbo].[RSCRM_Email_Subscribe]    Script Date: 1/27/2017 10:21:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[RSCRM_Email_Subscribe]
(
	@email nvarchar(50),
	@id bigint = 0,
	@is_primary bit = 0,
	@opt_out bit = 0
) 
AS
BEGIN TRY
	declare @user_uuid uniqueidentifier
	BEGIN TRAN
	 
	if(EXISTS(SELECT * FROM T_RSCRM_Email WHERE email=@email))
		RAISERROR('Email already exists', 16, 1)
	
		BEGIN
		SET @user_uuid = NEWID()
		INSERT INTO T_RSCRM_Email(user_uuid,email,is_primary,opt_out) values (@user_uuid,@email,@is_primary,@opt_out)
		select email from T_RSCRM_Email where user_uuid = @user_uuid
	END
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
