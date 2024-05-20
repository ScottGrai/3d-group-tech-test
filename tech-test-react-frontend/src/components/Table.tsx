import { Fragment, useState } from "react";
import { Alert, Badge, Button, Flex, Menu, Modal, Table } from "@mantine/core";
import { EStatus, ITableData } from "../descriptors/TableModels";


function TableComponent({ data }: { data: Array<ITableData> }) {
  const [tableData, setTableData] = useState<ITableData[]>(data);
  const [opened, setOpened] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [displayAlert, setDisplayAlert] = useState(false);

  const closeModal = () => {
    setSelectedRow(null);
    setOpened(false);
  };

  const deleteRow = () => {
    if (selectedRow) {
      setTableData(prevTableData => prevTableData.filter(row => row.name !== selectedRow));
      closeModal();
      setDisplayAlert(true);
    }
  }

  const updateRow = (action: "active" | "pendingReview" | "disabled") => {
    if (selectedRow) {
      setTableData(prevTableData => {
        return prevTableData.map((tableData) => {
          if (tableData.name === selectedRow) {
            const newData = tableData;
            newData.status = action;
            return newData;
          }
          return tableData;
        })
      });
      closeModal();
    }
  };

  const assignStatusColor = (statusText: EStatus) => {
    switch(statusText) {
      case EStatus.active:
        return "green";
      case EStatus.pendingReview:
        return "yellow";
      case EStatus.disabled:
        return "orange";
      default:
        return "black";
    }
  };

  const rows = tableData.map((row) => {
    const categoriesFormatted = row.categories.join(", ");

    return (
      <Fragment key={row.name}>
        <Modal opened={opened} onClose={closeModal} title="Are you sure you wish to delete this row?">
          <Flex
            mih={50}
            gap="xs"
            justify="center"
            align="center"
            direction="row"
          >
            <Button color="green" onClick={deleteRow}>Confirm</Button>
            <Button color="red" onClick={closeModal}>Cancel</Button>
          </Flex>
        </Modal>

        <Table.Tr key={row.name}>
          <Table.Td>{row.name}</Table.Td>
          <Table.Td>{row.priceInPounds}</Table.Td>
          <Table.Td>{categoriesFormatted}</Table.Td>
          <Table.Td>
            <Badge color={assignStatusColor(EStatus[row.status])}>{EStatus[row.status]}</Badge>
          </Table.Td>
          <Table.Td>
            <Menu>
              <Menu.Target>
                <Button onClick={() => setSelectedRow(row.name)}>Edit</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item color="green" onClick={() => updateRow("active")}>
                  Activate
                </Menu.Item>
                <Menu.Item color="yellow" onClick={() => updateRow("pendingReview")}>
                  Set Pending
                </Menu.Item>
                <Menu.Item color="orange" onClick={() => updateRow("disabled")}>
                  Disable
                </Menu.Item>
                <Menu.Item color="red" onClick={() => setOpened(true)}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Table.Td>
        </Table.Tr>
      </Fragment>
    );
  });

  return (
    <>
      {displayAlert && <Alert variant="light" color="red" withCloseButton title="Deleted" onClose={() => setDisplayAlert(false)}>
        Successfully deleted row!
      </Alert>}
      {rows.length > 0 ?
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Price (£)</Table.Th>
              <Table.Th>Categories</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Edit</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        : <>No Data</>
      }
    </>
  );
}

export default TableComponent;
