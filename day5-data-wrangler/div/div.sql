-- Preparations

-- Insert org unit with code 'WORLD'
-- Insert user admin / Dhis_1234 and link to world org unit

-- Reset database after import

delete from datavalueaudit;
delete from datavalue;
delete from dataelement;
delete from organisationunit where code != 'WORLD';
