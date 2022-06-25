import { useParams, NavLink } from "react-router-dom";
import folderIcon from "../../../assets/home/folder.svg";

export function FolderButton({ _id, name }) {
  const { note } = useParams();
  return (
    <NavLink to={`${_id}/${note}`} className="side-button">
      <img src={folderIcon} />
      <p>{name}</p>
    </NavLink>
  );
}

export function Folders({ folders }) {
  return folders.map((e) => <FolderButton {...e} key={e._id} />);
}
