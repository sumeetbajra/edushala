USE [ezzo]
GO

/****** Object:  View [dbo].[vEZ_Class]    Script Date: 1/11/2017 9:06:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[vEZ_Class]
AS
select *, dbo.EZ_Class_GetFlags(a.class_uuid) as active_flags_xml,
	(SELECT * FROM EZ_Tag where id in (SELECT tag_id FROM EZ_Course_Tags WHERE course_uuid=a.course_uuid and tag_type='skill') FOR XML Path('skill_tag'), root('skill_tags'), TYPE) as skill_tags,
	(SELECT * FROM EZ_Course where course_uuid=a.course_uuid FOR JSON Path, WITHOUT_ARRAY_WRAPPER) as course,
	(SELECT * FROM vEZ_User where user_uuid=a.user_uuid FOR JSON Path, WITHOUT_ARRAY_WRAPPER) as educator,
	(SELECT * FROM EZ_Venue where venue_uuid=a.venue_uuid FOR JSON Path, WITHOUT_ARRAY_WRAPPER) as venue
 from dbo.EZ_Class a









GO


