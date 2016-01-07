<?php

namespace App\Http\Controllers;

use App\Hospital;
use App\Location;
use App\Weather;
use Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $travel_id = Request::input('travel_id');
        $locations = Location::where('travel_id', $travel_id)->orderBy('order', 'asc')->get();
        if (count($locations) > 0)
            return $locations;
        else
            return [];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $hospitals = file_get_contents('online-hospital.csv');
        $hospitals = explode("\n", $hospitals);
        for ($i = 1; $i < count($hospitals); $i++) {
            $hospital = explode(',', $hospitals[$i]);
            if (count($hospital) > 2) {
                Hospital::create([
                    'name' => $hospital[0],
                    'address' => $hospital[1],
                    'phone' => ($hospital[2]) ? $hospital[2] : ''
                ]);
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $data = Request::all();
        return Location::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $location = Location::findOrFail($id);
        $weathers = Weather::get($location->name);
        $hospitals = Hospital::where('address', 'LIKE', "%{$location->name}%")->get();
        $request = [
            'weathers' => $weathers,
            'hospitals' => $hospitals
        ];
        return json_encode($request);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
