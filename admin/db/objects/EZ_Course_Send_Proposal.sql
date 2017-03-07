USE [ezzo_dev]
GO
/****** Object:  StoredProcedure [dbo].[EZ_Course_Send_Proposal]    Script Date: 1/25/2017 10:22:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE EZ_Course_Send_Proposal
(
	@class_uuid uniqueidentifier OUTPUT,
	@user_uuid uniqueidentifier,
	@name nvarchar(200),
	@category char(3),
	@description nvarchar(MAX),
	@price int
)
AS
BEGIN TRY
	BEGIN TRAN
	SET NOCOUNT ON
	--Declare Statement
	DECLARE @id bigint	
    -- Parameter Validation
	
	IF(dbo.RS_IsNullGUID(@class_uuid)=1)
	BEGIN
		SET @class_uuid = NEWID()
		INSERT INTO EZ_Course_Proposal (
			[class_uuid],
			[user_uuid],
			[name],
			[category],
			[description],
			[price]
		) VALUES (
			@class_uuid,
			@user_uuid,
			@name,
			@category,
			@description,
			@price
		)
		SET @id = SCOPE_IDENTITY()
		
		-- notify
		SELECT
			(SELECT class_uuid,name as course_name,first_name,full_name, email FROM EZ_Course_Proposal a, vEZ_User b WHERE a.user_uuid=b.user_uuid and a.id=@id FOR XML Path('notify'), TYPE)
		as notify
		COMMIT TRAN
	END
	ELSE
	BEGIN
		IF NOT EXISTS(SELECT * FROM EZ_Course_Proposal WHERE class_uuid=@class_uuid AND user_uuid=@user_uuid)
			EXEC RS_CheckPermission @user_uuid, 'proposal_edit'	

		UPDATE T_EZ_Course_Proposal SET
			[name]=@name,
			[category]=@category,
			[description]=@description,
			[price]=@price,
			[IsActive] = 1
		WHERE [class_uuid]=@class_uuid
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
