import { getUsers } from "lib/firebaseMethods";

const isUserInDB = async (uid: string) => {
  const userData = await getUsers();

  const res = await Promise.all(userData);

  const haveUserDoc = res.some((el) => el.id === uid);

  return haveUserDoc;
};

export { isUserInDB };
