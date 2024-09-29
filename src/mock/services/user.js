import Mock from 'mockjs2'
import {builder} from "@/mock/util";

const info = (options) => {
    console.log("options==>",options)
    //随机数  1-100
    const g= Mock.Random.integer(1,10)
    const data = {
        [`list|${g}`]: [{
            'id|+1': 1,
            'name': '@cname',
            'age|1-100': 1,
            'address': '@county(true)',
            'phone': /^1[34578]\d{9}$/,
            'email': '@email',
            'isMale|1': [true, false]
        }],
        'total': g
    }


    return builder(data)
}


Mock.mock(/\/api\/user\/list/, 'post', info())
