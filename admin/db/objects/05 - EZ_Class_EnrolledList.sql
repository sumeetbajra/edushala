USE [Ezzo]
GO
/****** Object:  StoredProcedure [dbo].[EZ_Class_ListEnrolled]    Script Date: 1/21/2017 1:11:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[EZ_Class_EnrolledList]
(
	@user_uuid uniqueidentifier
)
AS
BEGIN TRY
	-- Declare Statement
    
	SELECT * FROM vEZ_Class WHERE class_uuid in (select class_uuid from EZ_Class_Students WHERE user_uuid=@user_uuid)

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
