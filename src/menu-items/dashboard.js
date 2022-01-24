// assets
import { IconFile, IconHome } from '@tabler/icons';
import MyFilesIcon from 'assets/images/icons/my-files.svg'
import DashboardIcon from 'assets/images/icons/dashboard.svg'
import TrashIcon from 'assets/images/icons/trash-icon.svg'

// custom icon
const CustomIcon = (src) => {
    return (
        <img src={src} height="21" width="20"  />
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
        },
        {
            id: 'trash',
            title: 'Trash',
            type: 'item',
            url: '/trash',
            icon: CustomIcon(TrashIcon),
            breadcrumbs: false
        }
    ]
};

export default dashboard;
