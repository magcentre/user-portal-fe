// assets
import { IconFile, IconHome } from '@tabler/icons';
import MyFilesIcon from 'assets/images/icons/my-files.svg'
import DashboardIcon from 'assets/images/icons/dashboard.svg'

// custom icon
const CustomIcon = (src) => {
    return (
        <img src={src} />
    )
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: CustomIcon(DashboardIcon),
            breadcrumbs: false
        },
        {
            id: 'my-files',
            title: 'My Files',
            type: 'item',
            url: '/my-files',
            icon: CustomIcon(MyFilesIcon),
            breadcrumbs: false
        }
    ]
};

export default dashboard;
