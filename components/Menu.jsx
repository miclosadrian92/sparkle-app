import { scrollToId } from "./utils";
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from "react";

export default function Menu({ menuItems, activeMenuItem, panelNr }) {
  const onClickHandler = link => {
    if (link) {
      scrollToId(link);
    }
    // add hash to url without refreshing page
    window.history.replaceState(window.location.href.split("#")[0], null, link);
    window.postMessage({ type: "hashUpdate", hash: link }, window.location.origin);
  };

  return (
    <div className="menuWrapper">
      <ul className="menuList">
        {menuItems.map((item, index) => {
          const unique = uuidv4();
          const editorReference = useMemo(() => panelNr === 0 && { itemID: `urn:aem:${item._path}/jcr:content/data/master`, itemType: "reference"}, [panelNr, item._path]);
          const editorItem = useMemo(() => panelNr === 0 && { itemType: 'text', itemProp: 'text'}, [panelNr, item._path]);
          return (
            <li
                itemScope {...editorReference}
                key={unique + index}
                onClick={() => onClickHandler(item?.link)}
                className={`menuListItem ${activeMenuItem === item.menuItemId ? "active" : ""}`}
                id={"menuItem-" + item.menuItemId + unique}
            >
              <span {...editorItem}>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
