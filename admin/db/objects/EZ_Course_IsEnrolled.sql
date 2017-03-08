use ezzo_dev
Go
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE PROCEDURE EZ_Course_IsEnrolled
	@class_uuid uniqueidentifier,
	@user_uuid uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    select user_uuid from EZ_Class_Students where class_uuid=@class_uuid and user_uuid=@user_uuid
END
GO
