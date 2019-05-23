define([
    'jquery', './index', './bifrostEditor' /*'./app'*/, "css!./style.css", "css!./index.css"
],
    function ($, Vdt, bifrost) {

        'use strict';

        return {

            initialProperties: {
                version: 1.0,
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [{
                        qWidth: 10,
                        qHeight: 50
                    }]
                }
            },

            // Define what the properties panel looks like
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    dimensions: {
                        uses: "dimensions",
                        min: 1,
                        max: 4
                    },
                    measures: {
                        uses: "measures",
                        min: 2,
                        max: 7
                    },
                    sorting: {
                        uses: "sorting"
                    },
                    appearance: {
                        uses: "settings",//not suppose to change the uses 
                        items: {
                            treeSettings: {
                                ref: "treeSettings",
                                label: "My text box",
                                type: "string",
                                show: false
                            },
                            timeperiodinrow: {
                                type: "boolean",
                                label: "Time Period In Row",
                                ref: "timeperiodinrow",
                                defaultValue: true
                            }
                        }
                    }/*,
                    customSection: {
                        component: "expandable-items",
                        label: "My Accordion Section",
                        items: {
                            treeSettings1: {
                                ref: "treeSettings1",
                                label: "My text box1",
                                type: "string"
                            }
                        }
                    }*/

                }
            },

            //Paint resp.Rendering logic
            paint: function ($element, layout) {
                
                try {

                    if (!this.propertyFired) {
                        this.propertyFired = 0;
                    }

                    if (this.propertyFired == 0) {
                        var me = this;
                        var treeComp = Vdt.Tree;
                        $element.empty();
                        $element.html('<span id="error"></span><div class="editor-icon" id="editor-icon" title="Open / Close Editor"><img class="edit-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAQAAABKIxwrAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfjAg4IMxlYCHuXAAAA9UlEQVQ4y+XQvyuEcRwH8NfzHKEslEVHJoNBUnaymck/IVFyg/n8KJdusZHFZFQkSVw66gYGdcud/A833HDF4Ld77nnsPuOn1/v7fX+/JM2McyX3dvQkWqsqBhCad6s3iMUZw2pq1sCsyXj8pF0gLwsCD2HsyXkHQku6ZfGi0RrvCbHoUOr9hj6FeOxHoGwuCX8E2uRs/gW/Bcq2ovCKfc3PX7f9L/GomsGmbS7q60JM23Uk/Qs3ZETOsX5jSoY+NxvRNSClCN8CMZgJVzrBuDvp6M5f3adUnOlC1anH1p0hcGLBshEd6q5duCGOP6squFRUlziv0bBLdmNKIrAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDItMTRUMDc6NTE6MjUrMDE6MDC4dhKhAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAyLTE0VDA3OjUxOjI1KzAxOjAwySuqHQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="/><img class="close-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAxIIOCTEOy/aAAABYElEQVQ4y5XTT24SYRjH8Q8baQwsTaQUWi7QVDdGGqLdKUxrYo/gTssVSPUMRgG9hKZykybaNNNFW951ewIXIMwMMyT+Vu/8nu/zZ955piSthjd6djRw7covP9woUN03U0Nd28rKtnUNBWObefiRYKCy4lecCg6zdl9st6i1PbGTdPXYY+tUEy+71IU11Zddgtrs+N1gbh5rr4Btb+enj0aziwyLV20LOim8IyyKVAV1+r4kgH3BQerpZSI68p6J16may5QsTs8ZF5qZqTvOc3FafnOvnHMneThl99zZKMAf5CTc8cdOLv7IraeZSNMFE92CYV4JnqVikTM+GBbO/sKN54noZ3221n64AyGR8m62HGOncyNvNfYXq7HQpmDPf+lQ/G8TC1TxMG2cuFrT5YlLUdaMBJ9UV+CqgenqLwo1I8FIT8uGsqbIV1NjW0uolEmqOxJpaSi5dWnip+sk8Bfxj1ocwA3QkgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xOFQwNzo1NjozNiswMTowMNcoQEsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMThUMDc6NTY6MzYrMDE6MDCmdfj3AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="/>           </div><div class="editor-div hide" id="editor-div"></div><div class="root" style="display :flex"><div class="nav-container" style ="height :100%;width:30%"></div><div class="tree-container" style = "height :100%;width:70%"></div></div>');
                        const treeProps = Vdt.VdtDefaults.getTreeProps();
                        const navProps = Vdt.VdtDefaults.getNavPanelProps();
                        const listenerLayout = layout;
                        // this.treeSettingsString ;
                        // this.treeSettings = this.treeSettingsString ? JSON.parse(this.treeSettingsString) : {
                        //     treeProps,
                        //     blankCanvas: true
                        // };    
                        layout.treeSettings = layout.treeSettings && layout.treeSettings != undefined ? JSON.parse(layout.treeSettings) : treeProps
                        var matrixValue = layout.qHyperCube.qDataPages[0].qMatrix;
                        var actualArray = [];
                        var dataGridMembers = [];
                        var obj = {};
                        var matrixValueLength;
                        var periodLen;
                        var periodInRow = layout.timeperiodinrow;
                        if (periodInRow) {
                            matrixValueLength = layout.qHyperCube.qDimensionInfo.length - 1;
                            periodLen = layout.qHyperCube.qDimensionInfo[layout.qHyperCube.qDimensionInfo.length - 1].qCardinal;
                        } else {
                            matrixValueLength = layout.qHyperCube.qDimensionInfo.length;
                            periodLen = layout.treeSettings.periods;
                        }
                        for (var i = 0; i < matrixValue.length; i++) {//22
                            for (var j = 0; j < matrixValueLength; j++) {//6 
                                if (dataGridMembers[i]) {
                                    obj = {
                                        "id": matrixValue[i][j].qText,
                                        "actualKey": dataGridMembers[i] + "/" + matrixValue[i][j].qText,
                                        "label": matrixValue[i][j].qText,
                                        "parent": dataGridMembers[i],
                                        "index": j
                                    };
                                    dataGridMembers[i] = dataGridMembers[i] + "/" + matrixValue[i][j].qText;
                                } else {
                                    obj = {
                                        "id": matrixValue[i][j].qText,
                                        "actualKey": matrixValue[i][j].qText,
                                        "label": matrixValue[i][j].qText,
                                        "index": j
                                    };
                                    dataGridMembers[i] = matrixValue[i][j].qText;
                                }
                                obj.series = [];
                                for (var k in actualArray) {
                                    if (actualArray[k]['actualKey'] === obj['actualKey'] && obj.actualKey !== undefined) {
                                        obj = {};
                                    }
                                }
                                if (j == matrixValueLength - 1 && !jQuery.isEmptyObject(obj)) {
                                    if (periodInRow) {
                                        for (var l = 0; l < periodLen; l++) {
                                            for (var m = 1; m <= layout.qHyperCube.qMeasureInfo.length; m++) {
                                                if (l == 0) {
                                                    obj.series[m - 1] = [];
                                                }
                                                obj.series[m - 1].push(Number(matrixValue[i + l][j + m + 1].qText));
                                            }
                                        }
                                    } else {
                                        var periodInfo = layout.qHyperCube.qMeasureInfo;
                                        var tempIndex = 0;
                                        for (var l = 0; l < periodInfo.length; l++) {
                                            if (l == 0) {
                                                obj.series[l] = [];
                                                tempIndex = l;
                                            }
                                            if (l == periodLen) {
                                                obj.series[tempIndex + 1] = [];
                                                tempIndex = tempIndex + 1;
                                            }
                                            obj.series[tempIndex].push(Number(matrixValue[i][j + l + 1].qText));
                                        }
                                    }
                                }
                                if (!jQuery.isEmptyObject(obj)) {
                                    actualArray.push(obj);
                                    obj = {};
                                }
                            }
                        }
                        actualArray.sort(function (a, b) {
                            return parseFloat(b.index) - parseFloat(a.index);
                        });
                        var actualHierarchy = flatToHierarchy(actualArray);
                        console.log(actualArray)
                        var newData = {
                            "rows": actualHierarchy
                        }
                        layout.treeSettings.data = newData;
                        if (!treeComp) {
                            treeComp = Vdt.ComposeVisual.createVisual({
                                type: 'tree',
                                container: document.querySelector(".tree-container"),
                                properties: layout.treeSettings
                            });
                        } else {
                            treeComp.updateProps(layout.treeSettings);
                        }
                        layout.treeSettings = JSON.stringify(layout.treeSettings);
                        const navComp = Vdt.ComposeVisual.createVisual({
                            type: "navpanel",
                            container: document.querySelector(".nav-container"),
                            properties: {
                                valueDriverTree: treeComp.id,
                                kpiList: ["1", "9"],
                                assumpList: ["1", "9"],
                                constraintsList: ["1", "9"]
                            }
                        });
                        const configurations = {
                            VdtInstance: Vdt,
                            treeInstance: treeComp,
                            dataParser: {
                                dataView: newData //newData
                            }
                        }
                        const editorElement = document.querySelector(".editor-div");
                        document.getElementById("editor-icon").addEventListener("click", function () {
                            let editorDiv = document.getElementById("editor-div");
                            let editorIcon = document.getElementById("editor-icon");
                            if (editorDiv.classList.contains("hide")) {
                                editorDiv.classList.remove("hide");
                                editorIcon.classList.add("editor-open");
                                window.Editor.loadEditor(editorDiv, {
                                    configurations,
                                    listener: (changes) => {
                                        let isTreeChanged = false;
                                        let isNavChanged = false;
                                        const treeSettingsString = listenerLayout.treeSettings;
                                        const treeSettings = treeSettingsString && treeSettingsString != undefined ? JSON.parse(treeSettingsString) : treeProps;
                                        for (var i = 0; i < changes.length; i++) {
                                            if (changes[i].change.name in treeProps && treeSettings[changes[i].change.name] !== changes[i].change.newValue) {
                                                isTreeChanged = true
                                                treeSettings[changes[i].change.name] = changes[i].change.newValue;
                                            }
                                        }
                                        if (isTreeChanged) {
                                            this.treeSettings = JSON.stringify(treeSettings);
                                            let parsedtreeSettings = JSON.parse(this.treeSettings);
                                            parsedtreeSettings.blankCanvas = false;
                                            treeComp.updateProps(parsedtreeSettings);
                                            me.backendApi.getProperties().then(function (reply) {
                                                reply.treeSettings = JSON.stringify(parsedtreeSettings);
                                                me.propertyFired = 1;
                                                me.backendApi.setProperties(reply);
                                            });
                                        }
                                    },
                                    getPropertyValue: (property) => {
                                        const treeSettingsString = listenerLayout.treeSettings;
                                        const treeSettings = treeSettingsString && treeSettingsString != undefined ? JSON.parse(treeSettingsString) : {};
                                        let value = treeSettings[property.propertyId];
                                        if (property.propertyId === "treeConfig" && !value) {
                                            value = [];
                                        }
                                        return value;

                                    }

                                });
                            } else {
                                editorDiv.classList.add("hide");
                                editorIcon.classList.remove("editor-open");
                                window.Editor.removeEditor(editorElement);
                            }
                        });

                        function flatToHierarchy(flat) {
                            var roots = []; // things without parent
                            // make them accessible by guid on this map
                            var all = {};
                            flat.forEach(function (item) {
                                all[item.actualKey] = item;
                            });
                            // connect childrens to its parent, and split roots apart
                            Object.keys(all).forEach(function (actualKey, i) {
                                var child = all[actualKey];
                                if (child.parent == null) {// jshint ignore:line
                                    if (child !== "" && child !== undefined && child != "undefined" && jQuery.isEmptyObject(child) === false) {
                                        roots.push(child);
                                    }
                                } else if (child.parent in all) {
                                    var parent = all[child.parent];
                                    if (!('children' in parent)) {
                                        parent.children = [];
                                    }
                                    parent.children.push(child);
                                    if (child.series) {
                                        for (var f = 0; f < child.series.length; f++) {
                                            if (!parent.series[f]) {
                                                parent.series[f] = [];
                                            }
                                            for (var g = 0; g < child.series[f].length; g++) {
                                                if (parent.series[f][g] === undefined) {
                                                    parent.series[f][g] = 0;
                                                }
                                                parent.series[f][g] += child.series[f][g];
                                            }
                                        }
                                    }
                                }
                            });
                            // done!
                            return roots;
                        }

                    }
                    else {
                        this.propertyFired = 0;
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        };
    });