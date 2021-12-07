import React, { useCallback } from 'react';
import { Table } from 'antd';
import UseWrapperTitle from '@/components/WrapperTable/useWrapperTitle';
import UseWrapperColumns from '@/components/WrapperTable/useWrapperColumns';
import './index.less';

const Index = ({ title, toolBarRender, pagination, columns, size = "small", ...restProps }) => {

    /**
     * tableSettingColumns用于动态控制table列
     */
    const tableSettingColumns = columns?.map(val => {
        return {
            title: val.title,
            key: val.dataIndex,
            disabled: val.required || val.fixed, // 固定的和required 不可以取消选择和拖动
        };
    });
    /**
     * title、 工具
     * wrapperTitle 包装的title
     * wrapperSize table size的值
     * filterColnmnsKey 过滤后要显示的key
     */
    const { wrapperTitle, wrapperSize, filterColnmnsKey } = useCallback(
        () => UseWrapperTitle({ title, toolBarRender, size, tableSettingColumns })
        , [title, toolBarRender, size]
    )();
    /**
    * table 表头和列公共方法处理
    */
    const wrapperColumns = useCallback(() => UseWrapperColumns(columns, pagination), [columns, pagination])();

    // 获取过滤和排序后的columns
    const filterColnmnsData = [];
    filterColnmnsKey.forEach(val => {
        wrapperColumns.forEach(item => {
            if (item.dataIndex === val) {
                filterColnmnsData.push(item);
            }
        });
    });

    return (
        <div className={'t-table'}>
            <Table
                title={wrapperTitle}
                size={wrapperSize}
                pagination={pagination === false ? pagination : {
                    size: "small",
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "80"],
                    showTotal: (total, range) => `显示${range[0]}到${range[1]}, 共 ${total} 条数据`,
                    ...pagination,
                }}
                columns={filterColnmnsData || []}
                {...restProps}
            />
        </div>
    );
};

export default Index;
