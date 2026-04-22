import {userType} from '@/lib/types/general'
import { LogOut } from '@/components/dashboard/LogOut'

import Image from 'next/image'

export function DashboardHeader({dashboardUser}: {dashboardUser: userType}) {
  return (
    <header>
    <nav className="dashboard-header flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="dashboard-header-user flex items-center gap-3">
            <Image src={ dashboardUser?.avatarUrl ?? '/admin-avatar.png' }
              alt="admin avatar"
              className="dashboard-header__avatar"
              width={40}
              height={40}
            />
            <div>{dashboardUser?.email}</div>
          </div>
        <div>
          <LogOut />
        </div>
      </nav>
    </header>
  )
}
