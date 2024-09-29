import request from "@/utils/http.ts";

class User {

    getUserList<T>(data:any): Promise<T>{
        return request({
            url: '/user/list',
            method: 'post',
            data
        })
    }


}

export default new User()
