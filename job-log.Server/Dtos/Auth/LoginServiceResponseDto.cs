﻿namespace job_log.Server.Dtos.Auth
{
    public class LoginServiceResponseDto
    {
        public string NewToken { get; set; }

        public UserInfoResult UserInfo { get; set; }

    }
}
