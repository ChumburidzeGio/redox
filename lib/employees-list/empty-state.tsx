import {UserGroupIcon} from "@heroicons/react/outline";
import {InviteForm} from "../invite-employee";

export default function EmptyState() {
    return (
        <div className="max-w-lg mx-auto mt-12">
            <div>
                <div className="text-center">
                    <UserGroupIcon className="mx-auto h-12 w-12 text-indigo-600" />
                    <h2 className="mt-2 text-lg font-medium text-gray-900">Invite your employees</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        You haven’t added any team members to your project yet. As the owner of this project, you can manage team
                        member permissions.
                    </p>
                </div>
                <InviteForm />
            </div>
        </div>
    )
}
