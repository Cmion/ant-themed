import { find, isEmpty } from "lodash";
import TableCell from "../TableCell";
import React from "react";
import { TableColumnProps } from "../../../types";
import { motion } from "framer-motion";
import { Skeleton, Empty, Typography } from "antd";
import { Align } from "../../UtilityComponents";
import { LoadingOutlined } from "@ant-design/icons";

type TableBodyProps = {
  columns: TableColumnProps;
  columnKeys: string[];
  dataSource: Array<{}>;
  checkState: any;
  onCheckedChange: Function;
  isLoadingContent: boolean;
  useSkeletonLoader: boolean;
};
export default (props: TableBodyProps) => {
  const {
    columns,
    columnKeys,
    dataSource,
    checkState,
    onCheckedChange,
    isLoadingContent,
    useSkeletonLoader,
  } = props;

  return (
    <motion.tbody className={"___table-body"}>
      {isLoadingContent && (
        <motion.tr
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ width: "100%", padding: 10 }}
        >
          <motion.td colSpan={columnKeys.length + 1} style={{ padding: 10 }}>
            {useSkeletonLoader ? (
              <div style={{ height: 450 }}>
                {" "}
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
            ) : (
              <Align
                alignCenter
                justifyCenter
                style={{ height: 450 }}
                children={[
                  <LoadingOutlined
                    style={{ fontSize: 40, color: "var(--accent)" }}
                    spin
                  />,
                ]}
              />
            )}
          </motion.td>
        </motion.tr>
      )}
      {!isLoadingContent && isEmpty(dataSource) && (
        <motion.td
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ width: "100%", padding: 10 }}
          colSpan={columnKeys.length + 1}
        >
          <Align
            style={{ height: 450 }}
            alignCenter
            justifyCenter
            children={[<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}         description={<Typography.Text>No data to display here!.</Typography.Text>} />]}
          />
        </motion.td>
      )}
      {!isLoadingContent &&
        !isEmpty(dataSource) &&
        dataSource.map((source: any, index) => {
          const checked =
            find(checkState?.checkedList, ["key", source?.key]) !== undefined;
          return (
            <TableCell
              columns={columns.selected}
              checked={checked}
              onCheckedChange={onCheckedChange}
              checkState={checkState}
              columnKeys={columnKeys}
              extraColumnsLength={1}
              source={source}
              key={`table_cell_${source?.key}`}
              index={index}
            />
          );
        })}
    </motion.tbody>
  );
};
