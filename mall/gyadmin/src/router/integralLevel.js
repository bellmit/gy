const SetLevel = () => import('@/views/integralLevel/SetLevel');
const GetIntegral = () => import('@/views/integralLevel/GetIntegral');
const RiskControl = () => import('@/views/integralLevel/RiskControl');
const EditGetIntegral = () => import('@/views/integralLevel/EditGetIntegral');
const CheckIntegral = () => import('@/views/integralLevel/CheckIntegral');
const Interest = () => import('@/views/integralLevel/interest');
const userIntegration = () => import('@/views/integralLevel/userIntegration');
const userIntegralView = () => import('@/views/integralLevel/userIntegralView');
const PaymentRecord = () => import('@/views/integralLevel/PaymentRecord');

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
    },
    //    fhy newadd
    {
        path: 'integralLevel/userIntegration',
        name: 'userIntegration',
        component: userIntegration,
        meta: { title: '用户积分查看' }
    },
    {
        path: 'integralLevel/userIntegralView',
        name: 'userIntegralView',
        component: userIntegralView,
        meta: { title: '用户积分明细' }
    },
    {
        path: 'integralLevel/PaymentRecord',
        name: 'PaymentRecord',
        component: PaymentRecord,
        meta: { title: '积分支付记录' }
    }
];

export default route;
