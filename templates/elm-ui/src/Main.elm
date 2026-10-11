module Main exposing (main)

import Browser
import Html exposing (Html, button, div, h1, h2, input, label, li, p, section, span, text, ul)
import Html.Attributes exposing (checked, class, placeholder, type_, value)
import Html.Events exposing (onClick, onInput)


type alias Task =
    { id : Int, title : String, done : Bool }


type alias Model =
    { tasks : List Task, draft : String }


type Msg
    = SetDraft String
    | AddTask
    | ToggleTask Int


init : Model
init =
    { tasks = [ Task 1 "Sketch the first screen" True, Task 2 "Make the button feel right" False, Task 3 "Send it to a human" False ]
    , draft = ""
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetDraft draft ->
            { model | draft = draft }

        AddTask ->
            let
                title = String.trim model.draft
                nextId = List.length model.tasks + 1
            in
            if String.isEmpty title then
                model
            else
                { model | tasks = model.tasks ++ [ Task nextId title False ], draft = "" }

        ToggleTask id ->
            { model | tasks = List.map (\task -> if task.id == id then { task | done = not task.done } else task) model.tasks }


view : Model -> Html Msg
view model =
    let
        complete = List.length (List.filter .done model.tasks)
        total = List.length model.tasks
    in
    div [ class "page" ]
        [ section [ class "card" ]
            [ p [ class "eyebrow" ] [ text "MONDAY / YOUR OWN PACE" ]
            , h1 [] [ text "today, gently" ]
            , p [ class "count" ] [ text (String.fromInt complete ++ " of " ++ String.fromInt total ++ " small things done") ]
            , div [ class "meter" ] [ div [ class "meter-fill", Html.Attributes.style "width" (if total == 0 then "0%" else String.fromInt (complete * 100 // total) ++ "%") ] [] ]
            , ul [ class "tasks" ] (List.map taskView model.tasks)
            , div [ class "add-row" ]
                [ input [ type_ "text", value model.draft, placeholder "Add a small thing…", onInput SetDraft ] []
                , button [ onClick AddTask ] [ text "+" ]
                ]
            ]
        , p [ class "footnote" ] [ text "A LITTLE ROOM TO GET THERE" ]
        ]


taskView : Task -> Html Msg
taskView task =
    li [ class (if task.done then "task is-done" else "task") ]
        [ button [ class "check", onClick (ToggleTask task.id), Html.Attributes.attribute "aria-label" (if task.done then "Mark incomplete" else "Mark complete") ] [ text (if task.done then "✓" else "") ]
        , span [] [ text task.title ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }
