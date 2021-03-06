USE [Ezzo]
GO
/****** Object:  StoredProcedure [dbo].[EZ_Class_Enroll]    Script Date: 1/25/2017 10:23:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[EZ_Class_Enroll]
(
	@class_uuid uniqueidentifier,
	@user_uuid uniqueidentifier,
	@coupon nvarchar(20),
	@SessionID bigint = null
)
AS
BEGIN TRY
	BEGIN TRAN
	SET NOCOUNT ON
	
	DECLARE @fee_amount int,
			@fee_discount int,
			@is_restricted bit
	
	SET @is_restricted=0
	
	SELECT @fee_amount=price, @is_restricted=is_restricted from EZ_Class WHERE class_uuid=@class_uuid
	SELECT @fee_discount=discount from EZ_Class_Coupons where class_uuid=@class_uuid and coupon=@coupon
	
	--IF(@is_restricted=1 and len(coalesce(@coupon,''))<1)
	--	RAISERROR('Invalid group code. Please try again.', 16, 1)
	
	IF(@is_restricted=1 and @fee_discount is null)
		RAISERROR('This course needs a valid group code. Enter your group code in the group code field. If you don''t have one, please contact Edushala Team to get one.', 16, 1)
	
	IF(@fee_discount is null)
	BEGIN
		SET @coupon = null
		SET @fee_discount = 0
	END
	
	DECLARE @user_id int, @cur_user_uuid uniqueidentifier, @TranID bigint, @TranUUID uniqueidentifier
	--EXEC @TranID=RS_Tran @SessionID, @TranUUID output, @user_id output, 0, @user_uuid output
		
	INSERT INTO EZ_Class_Students (class_uuid,user_uuid,fee_amount,fee_discount,coupon)
		VALUES (@class_uuid,@user_uuid,@fee_amount,@fee_discount,@coupon)
		
	COMMIT TRAN
	RETURN @TranID
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
