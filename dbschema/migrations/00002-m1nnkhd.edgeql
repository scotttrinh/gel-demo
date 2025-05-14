CREATE MIGRATION m1nnkhdjljtlien6zfa3aqehz6k3foy4etxb6pfi4vlfvzrd4whn5q
    ONTO m16xwrum5ts47lzjlkp4krw4d3zsztn4cwtg6n6xs3oi7jjnmyo5sq
{
  ALTER TYPE default::Folder {
      ALTER TRIGGER only_one_root USING (std::assert((std::count((SELECT
          default::Folder
      FILTER
          NOT (EXISTS (.parent))
      )) < 2), message := 'Only one root folder is allowed'));
  };
};
