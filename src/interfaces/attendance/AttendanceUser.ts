interface AttendanceUser {
  CID: number;
  CSID: number;
  ClassUser: {
    CID: number;
    IsFavorite: boolean;
    Nickname: string;
    Role: string;
    UID: number;
    User: {
      Image: string;
    };
  };
  UID: number;
  IsAttendance: string;
}

export default AttendanceUser;
