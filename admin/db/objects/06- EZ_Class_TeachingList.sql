USE [ezzo]
GO
/****** Object:  StoredProcedure [dbo].[EZ_Class_ListTeaching]    Script Date: 1/21/2017 2:02:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[EZ_Class_TeachingList]
(
	@user_uuid uniqueidentifier
)
AS
BEGIN TRY
	-- Declare Statement

    
	SELECT * FROM vEZ_Class WHERE user_uuid=@user_uuid

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
