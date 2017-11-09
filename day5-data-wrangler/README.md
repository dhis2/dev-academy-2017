# Data Wrangler

Data wrangler is a tool for collecting and importing metadata and data from CSV data files.

## Overview

* "/bin" contains command files.
* "/src" contains shared functions.
* "/data" contains sample data for import.

## Installation

Install the tool using NPM.

```
npm install -g
```

## Configuration

Put a file *datawrangler.json* in your DHIS2_HOME directory, i.e. where the DHIS2_HOME env variable points.

```
{
    "baseurl": "http://localhost/dhis",
    "username": "admin",
    "password": "Dhis_1234"
}
```

## Usage

The following commands can be invoked from the command line.

```
$ dw_import_metadata --file data/data.csv

$ dw_import_data --file data/data.csv
```
