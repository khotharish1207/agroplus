// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    BankOutlined,
    AppstoreOutlined,
    TeamOutlined,
    AccountBookOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    BankOutlined,
    AppstoreOutlined,
    TeamOutlined,
    AccountBookOutlined,
    ThunderboltOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'expense',
            title: 'Expense',
            type: 'item',
            url: '/expense',
            icon: icons.BankOutlined
        },
        {
            id: 'crop-master',
            title: 'Crop Master',
            type: 'item',
            url: '/crop-master',
            icon: icons.ThunderboltOutlined
        },
        {
            id: 'income',
            title: 'Income',
            type: 'item',
            url: '/income',
            icon: icons.AccountBookOutlined
        },
        {
            id: 'plot',
            title: 'Plot',
            type: 'item',
            url: '/plot',
            icon: icons.AppstoreOutlined
        },
        {
            id: 'party',
            title: 'Party',
            type: 'item',
            url: '/party',
            icon: icons.TeamOutlined
        }

        // {
        //     id: 'util-typography',
        //     title: 'Typography',
        //     type: 'item',
        //     url: '/typography',
        //     icon: icons.FontSizeOutlined
        // },
        // {
        //     id: 'util-color',
        //     title: 'Color',
        //     type: 'item',
        //     url: '/color',
        //     icon: icons.BgColorsOutlined
        // },
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/shadow',
        //     icon: icons.BarcodeOutlined
        // },
        // {
        //     id: 'ant-icons',
        //     title: 'Ant Icons',
        //     type: 'item',
        //     url: '/icons/ant',
        //     icon: icons.AntDesignOutlined,
        //     breadcrumbs: false
        // }
    ]
};

export default utilities;
