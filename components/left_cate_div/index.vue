<template>
    <div class="left_cate_box">
        <div class="head_orange_div"></div>
        <div class="phone_box_flex">
            <div class="left_box_logo_head width_65 margin_auto">
                <lang-select :selectWhatLang="select_lang_val" @selectLang="selectLang"></lang-select>
                <img src="../../static/img/html5games_logo.png" class="width_100 margin_top_10" alt="">
            </div>
            <!-- cate -->
            <div>
                <div class="cate_little_box display_flex" :class="{select_cate:0 === current_cate}" @click="selectCate({id:0})">
                    <div class="height_100 cate_left_border"></div>
                    <div class="flex_1 height_100">
                        <div class="width_80 height_100 margin_auto right_box">
                            {{$t('words.home')}}
                        </div>
                    </div>
                </div>
                <div class="cate_little_box display_flex" v-for="item in tagArr" :class="{select_cate:item.id == current_cate}" @click="selectCate(item)" :key="item.id">
                    <div class="height_100 cate_left_border"></div>
                    <div class="flex_1 height_100">
                        <div class="width_80 height_100 margin_auto right_box">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import langSelect from "../lang_select";
    import getLang from "../../util/get_lang";
    import bus from "../../util/bus";
    export default {
        data() {
            return {
                select_lang_val: "en",
                current_cate: 0,
            }
        },
        props: {
            tagArr: {
                default () {
                    return []
                },
                type: Array
            }
        },
        mounted() {
            this.setCurrentLangSelect();
        },
        methods: {
            setCurrentLangSelect() {
                this.$nextTick(() => {
                    this.select_lang_val = getLang();
                })
            },
            selectCate(item) {
                bus.$emit('option_state', false);
                this.current_cate = item.id;
                if (item.id === 0) {
                    this.$emit('getList');
                } else {
                    this.$emit("getTagList", item.id);
                }
            },
            selectLang(val) {
                this.select_lang_val = val;
                location.href = location.host.match(/http/) ?
                    "" :
                    "http://" + `${location.host}/?lang=${val}`;
            },
        },
        components: {
            langSelect
        }
    }
</script>

<style lang='less'>
    @import "../../assets/css/current_theme.less";
    .left_cate_box {
        height: 100%;
        background: @app_gray;
        .left_box_logo_head {
            padding: 10px 0 20px;
        }
        .cate_little_box {
            &:hover {
                .cate_left_border {
                    background: @app_font_color;
                }
            }
            &.select_cate {
                .cate_left_border {
                    background: @app_orange;
                }
                color:@app_orange;
            }
            height: 50px;
            font-size: 20px;
            color: @app_font_color;
            .cate_left_border {
                width: 4px;
                background: transparent;
                transition: .3s;
            }
            .right_box {
                border-bottom: 1px solid #ddd;
                display: flex;
                align-items: center;
            }
        }
        @media screen and (max-width:800px) {
            display: flex;
            flex-direction: column;
            .phone_box_flex {
                flex: 1;
                overflow: scroll;
            }
            .head_orange_div {
                height: 10px;
                background: @app_orange;
            }
            position:absolute;
            width:300px;
            overflow: scroll;
            left:-300px;
            top:0;
        }
    }
</style>