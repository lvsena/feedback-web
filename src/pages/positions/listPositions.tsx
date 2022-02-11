import { useState } from "react";
import {
  List,
  Table,
  useTable,
  IResourceComponentsProps,
  getDefaultSortOrder,
  useSelect,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine";

export const PositionList: React.FC<IResourceComponentsProps> = () => {
  const [locale] = useState("en");
  const [publicationState] = useState("live");

  const { tableProps, sorter } = useTable<IPosition>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: ["positions", "cover"],
      locale,
      publicationState,
    },
  });

  const { selectProps } = useSelect({
    resource: "positions",
    optionValue: "id",
  });

  return (
    <List>
      <br />
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
      >
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter={{ multiple: 3 }}
        />
        <Table.Column
          dataIndex="name"
          key="name"
          title="Nome"
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          sorter={{ multiple: 2 }}
        />
        <Table.Column<{ id: string }>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
