import React, { useMemo, useState, useEffect } from "react";
import "./styles.scss";
import moment from "moment";
import Table from "./partials/Table";
import Header from "./partials/Header";
import QuickFilter from "./partials/Header/QuickFilter";
import { clamp } from "lodash";
import { ColumnProps } from "./types";
import { Padding } from "./partials/UtilityComponents";
import { Button } from "antd";

interface DataTableProps {
  columns: ColumnProps[];
  dataSource: Array<any>;
  minColumns?: number;
  maxColumns?: number;
  useSkeletonLoader?: boolean;
}
const DataTable = (props: DataTableProps) => {
  const {
    columns: defaultColumns,
    dataSource: unpaginatedDataSource,
    minColumns: defaultMinCol,
    maxColumns: defaultMaxCol,
    useSkeletonLoader,
  } = props;
  const minColumns = clamp(defaultMinCol || 3, 3, 6);
  const maxColumns = clamp(defaultMaxCol || 3, minColumns, 6);

  const [columns, setColumns] = useState({
    all: defaultColumns || [],
    selected: defaultColumns?.slice?.(0, maxColumns) || [],
    unselected:
      defaultColumns?.length > maxColumns
        ? defaultColumns?.slice?.(maxColumns, defaultColumns.length)
        : [],
  });

  const [dataSource, setDataSource] = useState<{
    data: Array<any>;
    range: { from: number; to: number };
  }>({ data: [], range: { from: 0, to: 15 } });

  const [checkState, setCheckedState] = useState({
    checkedList: [],
    indeterminate: true,
    checkAll: false,
  });
  const [tablePages, setCurrentPage] = useState({
    all: unpaginatedDataSource.length,
    currentPage: 1,
  });
  const [pageRenderOrder, setPageRenderOrder] = useState(15);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const onCheckedChange = (checkedList: any) => {
    setCheckedState({
      checkedList,
      indeterminate:
        checkedList.length > 0 && checkedList.length !== dataSource.data.length,
      checkAll: checkedList.length === dataSource.data.length,
    });
  };
  //TODO: Find an optional way to get the total width of the table to enable responsiveness on screens.
  const onCheckAllChange = (e: any) => {
    setCheckedState({
      // @ts-ignore
      checkedList: e.target.checked ? dataSource.data : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const columnKeys = useMemo(
    () => columns.selected.map((value) => value?.key),
    [columns.selected]
  );

  const handlePagination = (page: number) => {
    setDataSource((prev) => {
      const to = pageRenderOrder * page;
      const from = to - pageRenderOrder;
      const range = { from, to };
      const data = unpaginatedDataSource.slice(from, to);
      return { range, data };
    });
    setCurrentPage((prev) => ({ ...prev, currentPage: page }));
  };

  useEffect(() => {
    setIsLoadingContent(true);
    const a = setTimeout(() => {
      setDataSource((prev) => ({
        ...prev,
        data: unpaginatedDataSource.slice(0, 15),
      }));
      setIsLoadingContent(false);
    }, 5000);

    return () => clearTimeout(a);
  }, []);

  return (
    <>
      <Padding vertical={40}>
        <Button
          onClick={() => {
            setIsLoadingContent(true);
            const a = setTimeout(() => {
              setDataSource((prev) => ({
                ...prev,
                data: unpaginatedDataSource.slice(0, 15),
              }));
              setIsLoadingContent(false);
            }, 5000);
          }}
        >
          Reload
        </Button>
      </Padding>
      <div className={"___table-container"}>
        <Header
          columns={columns}
          dataSource={dataSource.data}
          renderOrder={{ pageRenderOrder, setPageRenderOrder }}
        />
        <QuickFilter columns={columns} dataSource={dataSource.data} />
        <Table
          setColumns={setColumns}
          handlePagination={handlePagination}
          columns={columns}
          columnKeys={columnKeys}
          checkState={checkState}
          dataSource={dataSource.data}
          defaultColumns={defaultColumns}
          maxColumns={maxColumns}
          minColumns={minColumns}
          onCheckAllChange={onCheckAllChange}
          onCheckedChange={onCheckedChange}
          tablePages={tablePages}
          isLoadingContent={isLoadingContent}
          useSkeletonLoader={Boolean(useSkeletonLoader)}
        />
      </div>
    </>
  );
};

DataTable.defaultProps = {
  dataSource: [
    {
      key: "1",
      name: "Mike Boris",
      cost: 32,
      address: "10 Downing Street",
      hobby: "hunting",

      food_type: "Vegan",
      id: "#9iopp785der0011",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "2",
      name: "John Smith",
      cost: 62,
      address: "30 Downing Avenue",
      hobby: "hunting",

      food_type: "Meaty",
      id: "#990uiopcfe11",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "3",
      name: "Elia Jones",
      cost: 22,
      address: "40 Floor Street",
      hobby: "baking",
      food_type: "Vegan",
      id: "#99vvgty88031",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "5",
      name: "Nathan Philips",
      cost: 30,
      address: "4 14th Avenue",
      hobby: "Biking",
      food_type: "Vegan",
      id: "#9x70tyu31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "6",
      name: "John McCally",
      cost: 27,
      address: "45 Boston Avenue",
      hobby: "Gymnastics",
      food_type: "Vegan",
      id: "#99bg831",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "9",
      name: "Masi klones",
      cost: 42,
      address: "1 Main Street",
      hobby: "teaching",
      food_type: "Vegan",
      id: "#90bgg431",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "8",
      name: "Joseph Xi Lee",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#999nhh31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "10",
      name: "Mikel Leeland",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99@6770111",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "11",
      name: "Hanna Klose",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "12",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "13",
      name: "Hanna Um",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#4599r931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "14",
      name: "Josh Butland",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9s99vbb31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "15",
      name: "Gideon Morning",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9vb993f1",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "16",
      name: "James Levi",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99f931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "17",
      name: "Priah Singh",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9d99g31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "18",
      name: "Johanna Lee",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99d931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "19",
      name: "Emerald Lalong",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99h931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "20",
      name: "Lulu Oyetola",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan ",
      id: "#99v931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "21",
      name: "Matthew Lee",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9993100",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "22",
      name: "Gretchen Spears",
      cost: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9vbb99u31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
  ],
  columns: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      type: "text",
      autoComplete: true,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      type: "date",
      presentationType: "date",
      presentationColor: "processing",
      dateFormat: "lll",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      type: "currency",
    },
    {
      title: "Hobby",
      dataIndex: "hobby",
      key: "hobby",
      type: "list",
      presentationType: "tag",
      multiple: true,
      listMenu: [
        { label: "Swimming", value: "swimming" },
        { label: "Skipping", value: "skipping" },
        { label: "Skiing", value: "skiing" },
        { label: "Gaming", value: "gaming" },
        { label: "Movies", value: "movies" },
      ],
    },
    {
      title: "Food type",
      dataIndex: "food_type",
      key: "food_type",
      type: "boolean",
    },
    {
      title: "ID-1",
      dataIndex: "id",
      key: "id",
      type: "action",
      actionPresentationType: "default",
      actionCallback: (source: any) => console.log("action clicked id", source),
      actionTitle: "Print ID",
    },

    {
      title: "ID-2",
      dataIndex: "id",
      key: "id2",
      type: "action",
      actionPresentationType: "primary",
      actionCallback: (source: any) =>
        console.log("action clicked id2", source),
      actionTitle: "Print ID-2",
    },
    {
      title: "ID-5",
      dataIndex: "id",
      key: "id5",
      type: "text",
      bold: true,
    },
    {
      title: "ID-6",
      dataIndex: "id",
      key: "id6",
      type: "text",
    },
    {
      title: "ID-10",
      dataIndex: "id",
      key: "id10",
      type: "text",
    },
  ],
  maxColumns: 8,
  minColumns: 4,
  useSkeletonLoader: true,
};

export default DataTable;
