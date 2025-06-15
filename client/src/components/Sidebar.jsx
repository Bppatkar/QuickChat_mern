import assets, { userDummyData } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`bg-[#8185b2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="logo"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm"
              >
                {' '}
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p
                onClick={() => navigate('/logout')}
                className="cursor-pointer text-sm"
              >
                {' '}
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] py-3 px-4 mt-5 rounded-md flex items-center gap-2">
          <img src={assets.search_icon} className="w-3" alt="search" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-sm placeholder:[#c8c8c8] flex-1"
            placeholder="Search user..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {userDummyData.map((user, i) => (
          <div
            key={i}
            onClick={() => setSelectedUser(user)}
            className={`relative flex text-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id && 'bg-[#282142]/50'
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              className="w-[35px] aspect-[1/1] rounded-full"
              alt="avatar"
            />
            <div className="flex flex-col leading-5">
              <p className="text-sm">{user.fullName}</p>
              {i < 3 ? (
                <span className="text-green-400 text-sm">Online</span>
              ) : (
                <span className="text-neutral-400 text-sm">Offline</span>
              )}
            </div>
            {i > 2 && (
              <p className="absolute right-4 top-4 text-sm h-5 w-5 flex items-center justify-center  rounded-full bg-violet-500/50">
                {i}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
