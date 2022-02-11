import { useState } from "react";
import {
  List,
  Table,
  useTable,
  IResourceComponentsProps,
  getDefaultSortOrder,
  FilterDropdown,
  Select,
  useSelect,
  DateField,
  Space,
  EditButton,
  DeleteButton,
  ImageField,
  Form,
  Radio,
  Tag,
} from "@pankod/refine";

import { API_URL } from "App";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const [locale, setLocale] = useState("en");
  const [publicationState, setPublicationState] = useState("live");

  const { tableProps, sorter } = useTable<IUser>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: ["user", "cover"],
      locale,
      publicationState,
    },
  });

  const { selectProps } = useSelect({
    resource: "users",
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
          dataIndex="username"
          key="username"
          title="Username"
          defaultSortOrder={getDefaultSortOrder("username", sorter)}
          sorter={{ multiple: 2 }}
        />
        <Table.Column
          dataIndex="email"
          key="email"
          title="Email"
          defaultSortOrder={getDefaultSortOrder("email", sorter)}
          sorter={{ multiple: 1 }}
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
