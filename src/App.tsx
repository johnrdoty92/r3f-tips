import { Link } from "react-router";
import { routes } from "./routes";

const getLinkText = (path: string) =>
  path
    .replace("/", "")
    .split("-")
    .map((word) =>
      word.replace(/^[a-z]/, (match) =>
        match.toUpperCase(),
      ),
    )
    .join(" ");

function App() {
  return (
    <div className="home">
      <h1>React Three Fiber Tips</h1>
      <nav>
        {routes
          .filter(({ path }) => path !== "/")
          .map(({ path }) => (
            <Link to={path}>{getLinkText(path)}</Link>
          ))}
      </nav>
    </div>
  );
}

export default App;
