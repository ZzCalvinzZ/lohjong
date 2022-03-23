import "./App.css";
import { Stage, Container, Sprite, Text } from "@inlet/react-pixi";
import Tile from "components/Tile";

export const App = () => (
  <div className="App">
    <Stage>
      <Sprite image="./my-image.png" x={100} y={100} />
      <Tile x={50} y={50} width={100} height={150} color={0xfff} />

      <Container x={500}>
        <Text text="Hello World" />
      </Container>
    </Stage>
  </div>
);

export default App;
