#!/bin/bash
counter=1
for file in views/*
do
    echo 'import { clear_root } from "../utils.js"' > tmp && cat $file >> tmp && mv tmp $file;
    ((counter=counter+1))
done