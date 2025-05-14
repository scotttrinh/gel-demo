CREATE MIGRATION m16xwrum5ts47lzjlkp4krw4d3zsztn4cwtg6n6xs3oi7jjnmyo5sq
    ONTO initial
{
  CREATE FUTURE simple_scoping;
  CREATE ABSTRACT TYPE default::Timestamped {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_of_statement());
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
      CREATE INDEX ON (.createdAt);
      CREATE INDEX ON (.updatedAt);
  };
  CREATE TYPE default::File EXTENDING default::Timestamped {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY size: std::int64;
      CREATE REQUIRED PROPERTY url: std::str;
  };
  CREATE TYPE default::Folder EXTENDING default::Timestamped {
      CREATE LINK parent: default::Folder;
      CREATE LINK folders := (.<parent[IS default::Folder]);
      CREATE TRIGGER only_one_root
          AFTER UPDATE, INSERT 
          FOR ALL DO (std::assert((std::count((SELECT
              default::Folder
          FILTER
              NOT (EXISTS (.parent))
          )) <= 1), message := 'Only one root folder is allowed'));
      CREATE REQUIRED PROPERTY name: std::str;
  };
  ALTER TYPE default::File {
      CREATE REQUIRED LINK parent: default::Folder;
  };
  ALTER TYPE default::Folder {
      CREATE LINK files := (.<parent[IS default::File]);
  };
};
