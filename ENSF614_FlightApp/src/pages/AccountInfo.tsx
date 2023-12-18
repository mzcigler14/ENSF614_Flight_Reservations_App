/*
 *  File Name: AccountInfo.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a page os used to update/create
 * users. CreateUser component holds all the
 * functionality for changing/updating user info this is just to format
 * the page (Header, Create user layouts...)
 */
import Header from "../components/Header.tsx";
import CreateUser from "../components/CreateUser.tsx";

function AccountInfo() {
  const pageName = "Account Info";
  return (
    <div>
      <div className="header">
        <Header pageName={pageName}></Header>
      </div>
      <div className="user-info">
        <CreateUser></CreateUser>
      </div>
    </div>
  );
}
export default AccountInfo;
