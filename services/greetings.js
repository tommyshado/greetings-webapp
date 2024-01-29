const greetingsApp = (db) => {
  const addName = async (name) => {
    const pattern = /^[a-zA-Z]+$/;

    if (name.trim().match(pattern)) {
      const isAdded = await db.oneOrNone(
        `insert into greetings (name, count) values ($1, $2) on conflict (name) do update set count = greetings.count + 1 returning *`,
        [name, 1]
      );

      if (isAdded.count === 1) {
        return isAdded;
      } else {
        return false;
      }
    } else {
      return null;
    }
  };

  const addedNames = async () => {
    return await db.manyOrNone("select * from greetings");
  };

  const filterForName = async (name) => {
    return await db.oneOrNone("select * from greetings where name = $1", [
      name,
    ]);
  };

  const deleteNames = async () => {
    return await db.none("delete from greetings");
  };

  return {
    addName,
    addedNames,
    filterForName,
    deleteNames
  };
};

export default greetingsApp;
