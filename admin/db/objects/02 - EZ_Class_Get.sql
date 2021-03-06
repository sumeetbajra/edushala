USE [Ezzo]
GO
/****** Object:  StoredProcedure [dbo].[EZ_Class_Get]    Script Date: 1/24/2017 3:41:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[EZ_Class_Get]
(
	@class_uuid uniqueidentifier,
	@SessionID bigint=null
)
AS
BEGIN TRY
	DECLARE @has_enrolled bit, @has_paid bit
	SET @has_enrolled = 0
	SET @has_paid = 0
	
	DECLARE @user_id int, @user_uuid uniqueidentifier
	SELECT @user_uuid=user_uuid
			from RS_Sessions
			WHERE ID=@SessionID
	
	IF(@user_uuid is not null)
	BEGIN
		IF EXISTS (SELECT ID FROM EZ_Class_Students WHERE class_uuid=@class_uuid AND user_uuid=@user_uuid)
			SET @has_enrolled = 1
			
		IF EXISTS (SELECT ID FROM EZ_Class_Students 
				WHERE class_uuid=@class_uuid AND user_uuid=@user_uuid
				AND pay_amount>=(fee_amount-fee_discount)
			)
			SET @has_paid = 1
	END

	SELECT *, @has_enrolled as has_enrolled, @has_paid as has_paid FROM vEZ_Class WHERE class_uuid=@class_uuid
	
	RETURN 0
END TRY
BEGIN CATCH
	SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_STATE() AS ErrorState,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH
