import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import toast from 'react-hot-toast'
import '../styles/dataImport.css'

export default function DataImport({ onDataImported }) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState(null)
    const [fileName, setFileName] = useState('')

    const processFile = useCallback(async (file) => {
        setUploading(true)
        setFileName(file.name)

        try {
            const fileExtension = file.name.split('.').pop().toLowerCase()

            if (fileExtension === 'csv') {
                // Parse CSV
                Papa.parse(file, {
                    header: true,
                    complete: (results) => {
                        setPreview({
                            headers: Object.keys(results.data[0] || {}),
                            rows: results.data.slice(0, 10), // Preview first 10 rows
                            totalRows: results.data.length,
                            data: results.data
                        })
                        toast.success(`CSV file loaded: ${results.data.length} rows`)
                        setUploading(false)
                    },
                    error: (error) => {
                        toast.error(`CSV parsing error: ${error.message}`)
                        setUploading(false)
                    }
                })
            } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                // Parse Excel
                const reader = new FileReader()
                reader.onload = (e) => {
                    try {
                        const data = new Uint8Array(e.target.result)
                        const workbook = XLSX.read(data, { type: 'array' })
                        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
                        const jsonData = XLSX.utils.sheet_to_json(firstSheet)

                        setPreview({
                            headers: Object.keys(jsonData[0] || {}),
                            rows: jsonData.slice(0, 10),
                            totalRows: jsonData.length,
                            data: jsonData
                        })
                        toast.success(`Excel file loaded: ${jsonData.length} rows`)
                        setUploading(false)
                    } catch (error) {
                        toast.error(`Excel parsing error: ${error.message}`)
                        setUploading(false)
                    }
                }
                reader.readAsArrayBuffer(file)
            } else {
                toast.error('Unsupported file format. Please upload CSV or Excel files.')
                setUploading(false)
            }
        } catch (error) {
            toast.error(`Error processing file: ${error.message}`)
            setUploading(false)
        }
    }, [])

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            processFile(acceptedFiles[0])
        }
    }, [processFile])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        },
        maxFiles: 1
    })

    const handleImport = () => {
        if (preview && preview.data) {
            onDataImported(preview.data)
            toast.success('Data imported successfully!')
            setPreview(null)
            setFileName('')
        }
    }

    const handleClear = () => {
        setPreview(null)
        setFileName('')
    }

    return (
        <div className="data-import-container">
            <div className="import-header">
                <h2>📊 Import Data</h2>
                <p className="import-subtitle">Upload Excel or CSV files to analyze market trends</p>
            </div>

            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
            >
                <input {...getInputProps()} />
                <div className="dropzone-content">
                    {uploading ? (
                        <>
                            <div className="spinner"></div>
                            <p>Processing {fileName}...</p>
                        </>
                    ) : isDragActive ? (
                        <>
                            <div className="upload-icon">📥</div>
                            <p className="dropzone-text-active">Drop your file here</p>
                        </>
                    ) : (
                        <>
                            <div className="upload-icon">📁</div>
                            <p className="dropzone-text">Drag & drop your file here</p>
                            <p className="dropzone-subtext">or click to browse</p>
                            <div className="supported-formats">
                                <span className="format-badge">CSV</span>
                                <span className="format-badge">XLSX</span>
                                <span className="format-badge">XLS</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Preview */}
            {preview && (
                <div className="preview-container fade-in">
                    <div className="preview-header">
                        <div>
                            <h3>📋 Data Preview</h3>
                            <p className="preview-info">
                                Showing 10 of {preview.totalRows} rows • {preview.headers.length} columns
                            </p>
                        </div>
                        <div className="preview-actions">
                            <button className="btn btn-secondary" onClick={handleClear}>
                                Clear
                            </button>
                            <button className="btn btn-primary" onClick={handleImport}>
                                Import Data
                            </button>
                        </div>
                    </div>

                    <div className="preview-table-wrapper">
                        <table className="preview-table">
                            <thead>
                                <tr>
                                    {preview.headers.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {preview.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {preview.headers.map((header, colIndex) => (
                                            <td key={colIndex}>{row[header]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {preview.totalRows > 10 && (
                        <div className="preview-footer">
                            <p>+ {preview.totalRows - 10} more rows</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
