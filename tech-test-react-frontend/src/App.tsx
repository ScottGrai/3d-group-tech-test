import axios from "axios";
import { useEffect, useState } from "react";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TableComponent from "./components/Table";
import { ITableData } from "./descriptors/TableModels";
import Logo from "/3D-Group-Logo-resized-1.png";


function App() {
  const [data, setData] = useState<ITableData[] | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [opened, { toggle }] = useDisclosure();

  const api = axios.create({
    baseURL: "http://localhost:3000"
  });

  const getData = async () => {
    try {
      const response = await api.get("/");
      if (response.status === 200) {
        setData(response.data as ITableData[]);
        setErrorMsg("");
      }
    } catch (error: any) {
      setErrorMsg(`Error: ${error.code}. ${error.message}.`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <img src={Logo} width={150} alt="3D Group UK" />
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        {data !== null ?
          <TableComponent data={data} />
          : <>{errorMsg}</>}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
