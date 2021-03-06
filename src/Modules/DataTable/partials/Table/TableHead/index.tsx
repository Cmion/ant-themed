import { Button, Checkbox, Popover, Tooltip } from "antd";
import TableControls from "../../Header/Controls";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { motion } from "framer-motion";
import { TableColumnProps, ColumnProps } from "../../../types";

type TableHeadProps = {
  columns: TableColumnProps;
  columnKeys: string[];
  checkState: any;
  onCheckAllChange: ((e: any) => void) | undefined;
  setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
  maxColumns: number;
  minColumns: number;
  defaultColumns: ColumnProps[];
};

export default (props: TableHeadProps) => {
  const {
    columns,
    columnKeys,
    checkState,
    onCheckAllChange,
    setColumns,
    maxColumns,
    minColumns,
    defaultColumns,
  } = props;

  return (
    <motion.thead className={"___table-header"} transition={{type: 'inertia'}}>
      <tr className={"___table-columns"}>
        <motion.th
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            delay:  0.1,
            stiffness: 100,
            damping: 13,
          }}
          className={"___table-column"}
          style={{
            width: "64px",
          }}
        >
          <div className={"___table-header-checkbox-container"}>
            <Checkbox
              indeterminate={checkState.indeterminate}
              onChange={onCheckAllChange}
              checked={checkState.checkAll}
            />
          </div>
        </motion.th>
        {columns.selected.map((value, index) => {
          return (
            <motion.th
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                delay: ((index ?? 1) + 1) * 0.1,
                stiffness: 100,
                damping: 13,
              }}
              className={"___table-column"}
              key={value?.key}
              style={{
                width: `calc(100% / ${columnKeys.length + 2}) - 120px`,
              }}
            >
              <div className={"___table-column-container"}>
                <div className={"___table-column-title"}>{value?.title}</div>
              </div>
            </motion.th>
          );
        })}
        <motion.th
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            delay: (columns.selected.length || 1) * 0.1,
            stiffness: 100,
            damping: 13,
          }}
          className={"___table-column selectable-columns"}
          style={{
            width: 64,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={"___table-selectable-columns-child-container"}
          >
            <Popover
              placement="bottomRight"
              content={() => (
                <TableControls.ColumnReorder
                  columns={columns}
                  setColumns={setColumns}
                  maxColumns={maxColumns}
                  minColumns={minColumns}
                  defaultColumns={defaultColumns}
                />
              )}
              trigger="click"
              style={{ borderRadius: 10 }}
            >
              <Tooltip title={"Customize columns"} placement={"left"}>
                <Button
                  type="link"
                  style={{ background: "transaparent" }}
                  icon={
                    <span className={"anticon"}>
                      <span className={"anticon"}>
                        <i
                          className={"ri-list-settings-line"}
                          style={{ fontSize: 17 }}
                        ></i>
                      </span>
                    </span>
                  }
                />
              </Tooltip>
            </Popover>
          </motion.div>
        </motion.th>
      </tr>
    </motion.thead>
  );
};
