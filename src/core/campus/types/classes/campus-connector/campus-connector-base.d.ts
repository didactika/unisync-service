export interface ICampusConnectorBase {
  url: string;
  token: string;
}

export type GetSiteInfoResponse = {
  sitename: string; // site name
  username: string; // username
  firstname: string; // first name
  lastname: string; // last name
  fullname: string; // user full name
  lang: string; // Current language
  userid: number; // user id
  siteurl: string; // site url
  userpictureurl: string; // the user profile picture
  functions: Array<{
    name: string; // function name
    version: string; // The version number of the component to which the function belongs
  }>;
  downloadfiles?: number; // 1 if users are allowed to download files, 0 if not
  uploadfiles?: number; // 1 if users are allowed to upload files, 0 if not
  release?: string; // Moodle release number
  version?: string; // Moodle version number
  mobilecssurl?: string; // Mobile custom CSS theme
  advancedfeatures?: Array<{
    name: string; // feature name
    value: number; // feature value. Usually 1 means enabled.
  }>;
  usercanmanageownfiles?: number; // true if the user can manage his own files
  userquota?: number; // user quota (bytes). 0 means user can ignore the quota
  usermaxuploadfilesize?: number; // user max upload file size (bytes). -1 means the user can ignore the upload file size
  userhomepage?: number; // the default home page for the user: 0 for the site home, 1 for dashboard
  userprivateaccesskey?: string; // Private user access key for fetching files
  siteid?: number; // Site course ID
  sitecalendartype?: string; // Calendar type set in the site
  usercalendartype?: string; // Calendar type used by the user
  userissiteadmin?: number; // Whether the user is a site admin or not
  theme?: string; // Current theme for the user
  limitconcurrentlogins?: number; // Number of concurrent sessions allowed
  usersessionscount?: number; // Number of active sessions for current user
};
