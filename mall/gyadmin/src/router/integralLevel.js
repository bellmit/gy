const SetLevel = () => import('@/views/integralLevel/SetLevel');
const GetIntegral = () => import('@/views/integralLevel/GetIntegral');
const RiskControl = () => import('@/views/integralLevel/RiskControl');
const EditGetIntegral = () => import('@/views/integralLevel/EditGetIntegral');
const CheckIntegral = () => import('@/views/integralLevel/CheckIntegral');
const Interest = () => import('@/views/integralLevel/interest');

const route = [
    {
        path: 'integralLevel/setLevel',
        name: 'setLevel',
        component: SetLevel,
        meta: { title: '会员等级设置' }
    },
    {
        path: 'integralLevel/getIntegral',
        name: 'getIntegral',
        component: GetIntegral,
        meta: { title: '积分获取设置' }
    },
    {
        path: 'integralLevel/editGetIntegral',
        name: 'editGetIntegral',
        component: EditGetIntegral,
        meta: { title: '积分获取编辑' }
    },
    {
        path: 'integralLevel/riskControl',
        name: 'riskControl',
        component: RiskControl,
        meta: { title: '积分风险控制' }
    },
    {
        path: 'integralLevel/checkIntegral',
        name: 'checkIntegral',
        component: CheckIntegral,
        meta: { title: '积分查看' }
    },
    {
        path: 'integralLevel/interest',
        name: 'Interest',
        component: Interest,
        meta: { title: '会员等级权益' }
    }
];

export default route;
