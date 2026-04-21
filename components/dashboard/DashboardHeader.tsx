import {userType} from '@/lib/types/general'
import { LogOut } from '@/components/dashboard/LogOut'

import Image from 'next/image'

export function DashboardHeader({dashboardUser}: {dashboardUser: userType}) {
  return (
    <header>
    <nav className="dashboard-header">
      <div className="dashboard-header__user">
        <Image src={ dashboardUser?.avatarUrl ?? '/admin-avatar.png' }
          alt="admin avatar"
          className="dashboard-header__avatar"
          width={40}
          height={40}
        />
        <span className="dashboard-header__name">{dashboardUser?.email}</span>
        </div>
        <div>
          <LogOut />
        </div>
      </nav>
    </header>
  )
}
