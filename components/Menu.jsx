import { scrollToId } from "./utils";

export default function Menu({ itemtype, itemprop, menuItems, activeMenuItem }) {
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
          return (
            <li
                itemScope
                itemID={`urn:aem:${item._path}/jcr:content/data/master`}
                itemType="reference"
                itemfilter="cf"
                key={index}
                onClick={() => onClickHandler(item?.link)}
                className={`menuListItem ${activeMenuItem === item.menuItemId ? "active" : ""}`}
                id={"menuItem-" + item.menuItemId}
            >
              <span itemType="text" itemProp="text">{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
