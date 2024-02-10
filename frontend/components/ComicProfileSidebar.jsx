import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiDeviceTablet,
  HiFilm,
  HiFlag,
  HiMicrophone,
  HiTrendingUp,
  HiUser,
} from "react-icons/hi";
function ComicProfileSidebar({id}) {
  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <h1>Profile</h1>
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href={`/comic/profile/${parseInt(id)}/info`} icon={HiUser}>
              Personal Info
            </Sidebar.Item>
            <Sidebar.Item href={`/comic/profile/${parseInt(id)}/socials`} icon={HiTrendingUp}>
              Socials
            </Sidebar.Item>
            <Sidebar.Item href={`/comic/profile/${parseInt(id)}/genres`} icon={HiChartPie}>
              Genres
            </Sidebar.Item>
            <Sidebar.Item href={`/comic/profile/${parseInt(id)}/country`} icon={HiFlag}>
              Country
            </Sidebar.Item>
            <Sidebar.Item href={`/comic/profile/${parseInt(id)}/specials`} icon={HiMicrophone}>
              Specials
            </Sidebar.Item>
            <Sidebar.Item href={`/comic/profile/${parseInt(id)}/movies`} icon={HiFilm}>
              Movies
            </Sidebar.Item>
            <Sidebar.Item href={`/comic/profile/${parseInt(id)}/shows`} icon={HiDeviceTablet}>
              Shows
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default ComicProfileSidebar;
