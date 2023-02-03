import { scrollToId } from "./utils";
import { v4 as uuidv4 } from 'uuid';

export default function Menu({ menuItems, activeMenuItem }) {
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
          return (
            <li
                itemScope
                itemID={`urn:aem:${item._path}/jcr:content/data/master`}
                itemType="reference"
                key={unique + index}
                onClick={() => onClickHandler(item?.link)}
                className={`menuListItem ${activeMenuItem === item.menuItemId ? "active" : ""}`}
                id={"menuItem-" + item.menuItemId + unique}
            >
              <span itemType="text" itemProp="text">{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
