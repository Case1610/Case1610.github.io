import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import {
    Box,
    Checkbox,
    IconButton,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TablePagination,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { Assignment as AssignmentIcon, FilterList as FilterListIcon } from '@mui/icons-material';

interface Data {
    id: number;
    groupName: string;
    member: string;
    num: number;
}

function createData(
    id: number,
    groupName: string,
    member: string,
    num: number,
): Data {
    return {
        id,
        groupName,
        member,
        num,
    };
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'groupName',
        numeric: false,
        disablePadding: false,
        label: 'グループ名',
    },
    {
        id: 'member',
        numeric: false,
        disablePadding: false,
        label: 'メンバー名',
    },
    {
        id: 'num',
        numeric: true,
        disablePadding: false,
        label: '番号',
    },
];
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
interface EnhancedTableToolbarProps {
    numSelected: number;
    selectData: string;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const numSelected = props.numSelected;
    const [copyStatus, setCopyStatus] = useState('Copy？');
    const [openTip, setOpenTip] = useState(false);
    const handleCopy = () => {
        const csvContent = props.selectData;
        navigator.clipboard.writeText(csvContent)
            .then(() => {
                setCopyStatus('Copied!');
                setOpenTip(true);
            })
            .catch(err => {
                setCopyStatus('Error!');
                setOpenTip(true);
            });
    };

    const handleCloseTip = () => {
        // setOpenTip(true);
        setCopyStatus('Copy？')
    };
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    グループ一覧
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip
                    title={copyStatus}
                    arrow
                    placement='bottom'
                    onMouseEnter={() => {
                        setOpenTip(true);
                        setCopyStatus('Copy？');
                    }}
                    onMouseLeave={() => setOpenTip(false)}
                    open={openTip}
                    onClose={handleCloseTip}
                >
                    <IconButton onClick={handleCopy}>
                        <AssignmentIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                // Filter list
                <Tooltip title="Coming soon">
                    <IconButton >
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}


interface Group {
    groupName: string;
    members: string[];
}
interface OutputSectionProps {
    groups: Group[];
}
const OutputTable: React.FC<OutputSectionProps> = ({ groups }) => {

    const [rows, setRows] = useState<Data[]>([]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () => {
            const sortedRows = [...rows].sort(getComparator(order, orderBy));
            const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
            console.log('Visible Rows:', paginatedRows);
            return paginatedRows;
        },
        [order, orderBy, page, rowsPerPage, rows],
    );
    const renderCSV = () => selected.map((id) => {
        const row = rows.find((row) => row.id === id);
        if (!row) return ''; // Ignore undefined rows
        return `${row.groupName},${row?.member},${row?.num}`;
    }).join('\n');
    const selectData = `${headCells.map((headCell) => headCell.label).join(',')}\n${renderCSV()}`;
    useEffect(() => {
        const newRows = groups.flatMap((group, groupIndex) =>
            group.members.map((member, memberIndex) =>
                createData(
                    groupIndex * 1000 + memberIndex,
                    `${group.groupName}`,
                    member,
                    memberIndex + 1
                )
            )
        );
        setRows(newRows);
    }, [groups]);
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selectData={selectData} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 100 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row.groupName}</TableCell>
                                        <TableCell align="left">{row.member}</TableCell>
                                        <TableCell align="right">{row.num}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}

export default OutputTable;